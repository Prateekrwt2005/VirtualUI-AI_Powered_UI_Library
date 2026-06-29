 import Component from "../models/component.model.js";
import {User} from "../models/user.model.js";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

export const saveComponent = async (req, res) => {
  try {
    const { name, code, props } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "user is not found",
      });
    }

    if (user.role === "admin") {
  const existing = await Component.findOne({
    name,
    visibility: "public",
  });

  if (existing) {
    return res.status(400).json({
      message: "Admin cannot create duplicate public component name",
    });
  }
}
const component = await Component.create({
  name,
  code,
  props,
  owner: req.userId,
})

return res.status(200).json(component)

} catch (error) {
  return res.status(500).json({
    message: `failed to save component ${error}`
  })
}
}


 export const publishComponent = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can publish",
      });
    }

    const { componentId } = req.body;
    const component = await Component.findById(componentId);

    if (!component) {
  return res.status(404).json({
    message: "Component not found",
  });
}

if (component.owner.toString() !== req.userId.toString()) {
  return res.status(403).json({
    message: "You can only publish your own components",
  });
}

const libPath = path.join(process.cwd(), "../virtualui-lib");

const componentDir = path.join(
  libPath,
  "src/components",
  component.name
);

const componentFile = path.join(
  componentDir,
  `${component.name}.jsx`
);

const indexFile = path.join(libPath, "src/index.js");

// create component folder
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// write component code
fs.writeFileSync(componentFile, component.code);

// read index file
let indexContent = fs.readFileSync(indexFile, "utf8");

const exportLine =
  `export { ${component.name} } from "./components/${component.name}/${component.name}.jsx";`;

// prevent duplicate export
if (!indexContent.includes(exportLine)) {
  fs.appendFileSync(indexFile, `\n${exportLine}\n`);
}

// clean old build
console.log("Cleaning old build...");

const distPath = path.join(libPath, "dist");

if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}

// Install library dependencies (required on remote servers like Render)
console.log("Installing library dependencies...");
execSync("npm install --include=dev", {
  cwd: libPath,
  encoding: "utf8",
});

// Configure npm authentication token
const npmrcPath = path.join(libPath, ".npmrc");
if (process.env.NPM_TOKEN) {
  console.log("Configuring NPM authentication token...");
  fs.writeFileSync(
    npmrcPath,
    `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN.trim()}\n`
  );
} else {
  console.warn("WARNING: NPM_TOKEN environment variable is not defined in backend settings.");
}

// Fetch latest version from npm registry to prevent duplicate version conflicts
let nextVersion = "1.0.0";
try {
  console.log("Fetching latest version from npm registry...");
  const npmPackageName = "@prateekrwt07/virtualui";
  const npmVersion = execSync(`npm view ${npmPackageName} version`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"] // ignore stderr to prevent throwing if package doesn't exist yet
  }).trim();
  
  if (npmVersion) {
    const [major, minor, patch] = npmVersion.split(".").map(Number);
    nextVersion = `${major}.${minor}.${patch + 1}`;
    console.log(`Latest NPM version: ${npmVersion}. Next version to publish: ${nextVersion}`);
  }
} catch (e) {
  console.log("Could not fetch npm version (package might be unpublished). Defaulting to 1.0.0");
}

try {
  // Write the new version to package.json
  const packageJsonPath = path.join(libPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.version = nextVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Updated package.json version to ${nextVersion}`);

  //build lib
  console.log("Building library...");
  execSync("npm run build", {
    cwd: libPath,
    encoding: "utf8",
  });

  // publish to npm
  console.log("Publishing to npm...");
  execSync("npm publish --access public", {
    cwd: libPath,
    encoding: "utf8",
  });
} finally {
  // Clean up .npmrc to prevent token leaks
  if (fs.existsSync(npmrcPath)) {
    console.log("Cleaning up .npmrc authentication file...");
    fs.unlinkSync(npmrcPath);
  }
}

  component.visibility = "public";
component.npmPackage = "@prateekrwt07/virtualui";

await component.save();

return res.status(200).json({
  message: "Component published successfully"
});              


 
  } catch (error) {
    console.error("Publish execution error details:", error);
    const detailMsg = error.stderr || error.stdout || error.message || "";
    return res.status(500).json({
      message: `Failed to publish component: ${detailMsg.toString().substring(0, 300)}`
    });
  }
}    

export const getAllComponents = async (req, res) => {
  try{
    const components=await Component.find().populate("owner","name,email").sort({createdAt:-1})
    if(!components){
      return res.status(404).json({
        message:"No components found"
      })
    }
    return res.status(200).json({
      message:"All components",
      components
    })


  } catch(error){
    return res.status(500).json({
      message: `Failed to get components ${error}`
    })
  }
}