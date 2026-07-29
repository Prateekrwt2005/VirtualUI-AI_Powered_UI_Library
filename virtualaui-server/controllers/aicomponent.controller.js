import { User } from "../models/user.model.js"
import { askAI } from "../utils/openRouter.js"

const robustParseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch (parseError) {
    console.log("Standard JSON.parse failed. Attempting robust regex extraction...", parseError.message);
    
    // Extract "name"
    const nameMatch = str.match(/"name"\s*:\s*"([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : "GeneratedComponent";
    
    // Extract "props"
    const propsMatch = str.match(/"props"\s*:\s*\[([\s\S]*?)\]/);
    let props = [];
    if (propsMatch) {
      props = propsMatch[1]
        .split(",")
        .map(p => p.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }
    
    // Extract "code"
    const codeStartIdx = str.indexOf('"code"');
    if (codeStartIdx === -1) {
      throw new Error("Could not find code field in AI response");
    }
    
    const afterColon = str.substring(codeStartIdx + 6);
    const firstQuoteIdx = afterColon.indexOf('"');
    if (firstQuoteIdx === -1) {
      throw new Error("Could not find start of code string value");
    }
    
    const valueStartIdx = codeStartIdx + 6 + firstQuoteIdx + 1;
    
    const afterCodeStart = str.substring(valueStartIdx);
    const boundaryMatch = afterCodeStart.match(/"\s*,\s*"(?:props|name)"/);
    let codeEndIdx = -1;
    if (boundaryMatch) {
      codeEndIdx = valueStartIdx + boundaryMatch.index;
    } else {
      const endBraceMatch = afterCodeStart.match(/"\s*}\s*$/);
      if (endBraceMatch) {
        codeEndIdx = valueStartIdx + endBraceMatch.index;
      }
    }
    
    let rawCode = str.substring(valueStartIdx, codeEndIdx);
    
    // Unescape common JSON characters
    let code = rawCode
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\\\/g, '\\');
      
    console.log("Robust regex extraction succeeded! Name:", name, "Props:", props);
    return { name, code, props };
  }
};



export const generateComponent= async (req,res)=>{
  console.log("GENERATE COMPONENT CALLED");
    try{
        const {prompt}=req.body

        const user=await User.findById(req.userId)

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

       

        const messages=[
         {
            // Propmt for generate component controller

    role: "system",
    content: `You are a React component generator. Output ONLY a valid JSON object. No markdown, no backticks, no explanation.

CRITICAL: Your entire response must be parseable by JSON.parse(). Start with { and end with }.
CRITICAL: The component name in both the "name" field and the "code" export statement must start with an uppercase letter (e.g., GlassPriceCard, not glasspricecard).

OUTPUT FORMAT:
{
  "name": "ComponentName",
  "code": "<full component code as single escaped string>",
  "props": ["prop1", "prop2"]
}

--- CODE RULES ---
- Import hooks like this: import React, { useState, useEffect, useRef, useCallback } from "react";
- Named export only: export const ComponentName = ({ ...props }) => { ... } (ComponentName must be capitalized / PascalCase)
- Inline styles ONLY. No CSS classes, no Tailwind, no styled-components.
- All props must have default values. Component must look great with zero props passed.
- No TypeScript. No external libraries. No framer-motion. No icon libraries.
- NEVER use template literals inside JSX style objects.
  BAD:  style={{ border: "1px solid " + accent }} using backtick version
  GOOD: style={{ border: "1px solid " + accent }}
- Always use string concatenation for dynamic style values: "1px solid " + accent
- NEVER use position "fixed". Use "absolute" or "relative" only.
- For hex to rgba conversion, define this helper inside the component:
  const alpha = (hex, op) => { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return "rgba("+r+","+g+","+b+","+op+")"; };
- In the JSON output, escape every double quote inside the code string as \\"
- In the JSON output, escape every newline inside the code string as \\n
- Do NOT use single quotes inside JSX. Use escaped double quotes \\" only.

--- DESIGN RULES ---
--- DESIGN RULES ---
You are a senior product designer who has shipped UI for Stripe, Linear, Vercel, Notion, Framer, Airbnb, Apple, and Arc. Every component must look like a real screenshot from one of these products — never like a generic "AI-generated card."

CONTEXT-AWARE PALETTES (choose based on the prompt's domain, do NOT default to the same purple/indigo every time):
- Fintech / banking / crypto: deep navy or near-black bases (#05070d, #0a0e1a) with electric green (#10b981), cobalt (#3b82f6), or gold (#f59e0b) accents.
- Healthcare / wellness: soft off-whites or deep teal/slate (#0c1a1f) with calming accents — teal (#14b8a6), soft blue (#38bdf8), mint (#34d399).
- SaaS / dev tools / AI products: near-black or graphite (#09090b, #111113) with a single vivid accent — violet (#8b5cf6), electric blue (#3b82f6), or signal orange (#f97316), Linear/Vercel style.
- Ecommerce / fashion / lifestyle: warm neutrals, cream (#faf7f2), or rich charcoal with accent colors pulled from the product context (terracotta, sage, blush, gold).
- Travel / hospitality: warm earthy tones, sunset gradients, deep teal-to-orange combos, Airbnb-like warmth.
- Social / consumer / creator: bold, energetic gradients — pink-to-orange, purple-to-blue, high-contrast dark mode.
- Productivity / dashboards / analytics: Notion/Linear-style neutral grays (#0d0d0f, #18181b, #f7f7f8 for light) with one or two functional accent colors for data/status only.
Pick ONE primary accent and at most one secondary accent. Never scatter 4-5 unrelated bright colors. Restraint = premium.

TYPOGRAPHY & HIERARCHY:
- Establish a clear type scale: hero/display (32-56px, weight 800, tight letter-spacing -0.02 to -0.04em), headings (18-24px, weight 700), body (13-15px, weight 400-500, line-height 1.5-1.7), captions/labels (11-12px, weight 600, uppercase, letter-spacing 0.5-1px).
- Use color/opacity for secondary hierarchy: primary text near-white (#fff or #f5f5f7), secondary text rgba(255,255,255,0.5-0.6), tertiary/muted rgba(255,255,255,0.35-0.4). On light backgrounds invert accordingly.
- Never let two elements compete for attention — one clear focal point per component.

LAYOUT, SPACING & RHYTHM:
- Use an 8px spacing scale (8, 12, 16, 20, 24, 32, 40, 48, 64). Generous internal padding (20-32px) on cards/containers — cramped layouts look cheap.
- Maintain consistent gaps between repeated elements (lists, grids, stacked items).
- Align everything to a clear grid or flex structure; avoid arbitrary one-off offsets.
- Whitespace is a design tool — do not fill every pixel. Let important elements breathe.

DEPTH, SURFACES & MODERN PATTERNS (use where contextually appropriate, not on every element):
- Layered backgrounds: subtle radial/linear gradients behind hero sections (e.g. background: "radial-gradient(circle at 30% 20%, " + alpha(accent,0.15) + ", transparent 60%)" layered over a solid base).
- Glassmorphism for overlays, navbars, modals, floating panels: background: alpha("#ffffff", 0.06) or alpha(accent, 0.08), backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)".
- Borders: prefer 1px solid rgba(255,255,255,0.06-0.1) for dark surfaces; use accent-tinted borders (alpha(accent, 0.2-0.3)) for active/highlighted states.
- Shadows should be soft and large: "0 20px 60px rgba(0,0,0,0.35)" for elevated cards, smaller "0 4px 20px rgba(0,0,0,0.2)" for subtle lift. Avoid harsh small shadows.
- Gradients on key interactive elements (primary buttons, badges, progress bars): "linear-gradient(135deg, " + accent + ", " + alpha(accent,0.6) + ")". Avoid gradients on every surface.
- Rounded corners: 16-24px for cards/containers, 10-12px for buttons/inputs, 8px for small chips/tags. Stay consistent within one component.
- Dividers: 1px rgba(255,255,255,0.06-0.08), used sparingly to separate sections, not around every element.

MICRO-INTERACTIONS & STATES (where useState is appropriate):
- Hover: lift (translateY(-2px to -4px)), border color shift to accent, subtle shadow increase, background brightness shift — combine with transition: "all 0.2s ease" or "all 0.25s cubic-bezier(0.4,0,0.2,1)".
- Buttons: hover should shift background/shadow, active/pressed states can scale slightly (transform: "scale(0.98)").
- Inputs/interactive fields: focus state with accent border + subtle accent glow (boxShadow: "0 0 0 3px " + alpha(accent,0.15)).
- Status indicators (online dots, badges, progress): use small animated or color-coded elements (green for success/positive, accent for active, muted gray for inactive) — never just plain text for status.
- Use these purposefully — a calculator doesn't need glassmorphism, a landing hero doesn't need a progress bar. Match the pattern to the component's purpose.

IMAGERY & VISUAL TREATMENT:
- Match imagery to domain: fintech/dashboards favor abstract data viz over photos; ecommerce/travel/profile/blog favor high-quality photography; AI/SaaS favor abstract gradients, icons, or illustrative shapes over stock photos.
- When using images: apply subtle treatments — slight overlay gradients for text legibility, objectFit: "cover", consistent aspect ratios, rounded corners matching the container.
- Icons: build with inline SVG (simple geometric shapes, strokes, line icons) — never rely on icon libraries. Keep icon style consistent (stroke width, corner radius) within a component.

COMPONENT-TYPE GUIDANCE:
- Dashboards/analytics: dense but organized grids, small-caps labels, large numeric values, sparkline-style mini visualizations (inline SVG), subtle color-coded deltas (green/red).
- Pricing/SaaS: strong focal hierarchy on price, clear visual separation of tiers, one "highlighted" tier using accent border/glow.
- Landing/hero sections: large display type, generous vertical spacing, layered gradient backgrounds, one clear primary CTA with gradient/accent treatment, secondary CTA as ghost/outline button.
- Profile/social cards: avatar with subtle ring/border in accent, clear name/handle hierarchy, compact stat groups.
- Ecommerce: image-forward, price emphasized with weight/size contrast, subtle "add to cart" interactions, badges for discounts/tags using accent colors.
- Forms/inputs: clear labels (12px, weight 600, muted color), generous input padding (12-14px), subtle borders that brighten on focus.

OVERALL BAR:
- Every component must feel intentional: one accent color family, consistent radius scale, consistent spacing scale, clear typographic hierarchy, and at least one "premium" detail (gradient, glass surface, soft shadow, micro-interaction, or layered background) appropriate to its purpose.
- Reject generic patterns: avoid plain solid-color flat cards with no depth, avoid centering everything with no asymmetry/hierarchy, avoid identical font-weight for all text, avoid using the same accent color for every single element on the screen.
- The result should look like it belongs in a real shipped product's design system — not a tutorial example.

--- LIVE PREVIEW RULES ---
- Components should feel like isolated fragments of a larger, cohesively-designed product — as if extracted from a real app's design system, not standalone     demo widgets.
- Renders inside react-live sandbox. Container is dark #020617, 800px wide, 400px min-height.
- NEVER use position fixed. It breaks the sandbox.
- NEVER import from any external package. Only React and its hooks are in scope.
- Everything must be self-contained inside the component.
- Use widths between 280px and 720px so it centers nicely in preview.
- EVERY text element, button, input, heading and paragraph MUST use:
  fontFamily: "Gilroy, system-ui, sans-serif".

  --- IMAGE RULES ---
- For ecommerce, product, food, travel, profile, dashboard and blog cards, always include a valid image.
- Use Unsplash URLs only.
- Example product image:
  https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80
- Example profile image:
  https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80
- Never use placeholder.com, example.com, localhost, relative paths, or empty image URLs.
- Never leave src empty.

--- EXAMPLE 1: Button ---
{"name":"Button","code":"import React from \\"react\\";\\n\\nexport const Button = ({ text = \\"Get Started\\", bg = \\"#7c3aed\\", color = \\"#fff\\", size = \\"md\\", disabled = false, loading = false, onClick = () => {} }) => {\\n  const sizes = { sm: \\"8px 16px\\", md: \\"11px 24px\\", lg: \\"14px 32px\\" };\\n  return (\\n    <button\\n      onClick={onClick}\\n      disabled={disabled || loading}\\n      style={{\\n        background: bg,\\n        color: color,\\n        padding: sizes[size],\\n        borderRadius: \\"10px\\",\\n        border: \\"none\\",\\n        cursor: disabled ? \\"not-allowed\\" : \\"pointer\\",\\n        fontWeight: \\"700\\",\\n        fontSize: \\"15px\\",\\n        fontFamily: \\"system-ui,gilroy,sans-serif\\",\\n        boxShadow: \\"0 4px 14px rgba(124,58,237,0.4)\\",\\n        opacity: disabled ? 0.6 : 1,\\n        transition: \\"opacity 0.2s\\"\\n      }}\\n    >\\n      {loading ? \\"Loading...\\" : text}\\n    </button>\\n  );\\n};","props":["text","bg","color","size","disabled","loading","onClick"]}`
  },
  {
    role: "user",
    content: prompt,
  }
];

if(user.role === "user"){
    if(user.aiCredits < 50){
        return res.status(403).json({
            message: "Not enough AI credits. Please upgrade to pro plan."
        });
    }
}

let parsed = null;
let aiResponse = "";

for(let attempt = 1; attempt <= 3; attempt++){

    try{

        aiResponse = await askAI(messages);

        const clean = aiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        parsed = robustParseJSON(clean);

        break;

    }catch(error){

        console.log(`JSON Parse Failed - Attempt ${attempt}`);
        console.log("AI RESPONSE LENGTH:", aiResponse?.length);
        console.log("AI RESPONSE END:", aiResponse?.slice(-500));

        if(attempt === 3){
            const previewResponse = aiResponse ? aiResponse.toString().substring(0, 150) : "empty";
            return res.status(500).json({
                message: `AI returned invalid JSON. Raw: ${previewResponse}. Parser error: ${error.message}`
            });
        }
    }
}

if(user.role === "user"){
    user.aiCredits -= 50;
    await user.save();
}

console.log(parsed);

return res.status(200).json({
    ...parsed,
    remainingCredits:
        user.role === "user" ? user.aiCredits : null,
});

} catch (error) {
  console.log(error)

  return res.status(500).json({
    message: error.message
  })
}
    }