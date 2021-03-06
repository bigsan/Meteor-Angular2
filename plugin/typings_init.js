var path = Plugin.path;
var fs = Plugin.fs;
var mkdirp = Npm.require('mkdirp');

var typingsDir = path.resolve('./typings');
var typingsFile = path.resolve(typingsDir, 'angular2-meteor.d.ts');

if(canProceed() && !fs.existsSync(typingsDir)) {
  mkdirp.sync(typingsDir);
}

if (canProceed() && !fs.existsSync(typingsFile)) {
  console.log('***** Creating TypeScript typings *****');
  fs.writeFileSync(typingsFile, getReference());
}

// check whether is this `meteor test-packages` or not
function canProceed() {
  var unAcceptableCommands = {'test-packages': 1, 'publish': 1};
  if(process.argv.length > 2) {
    var command = process.argv[2];
    return !unAcceptableCommands[command];
  }

  return true;
}

// Gets typings reference.
function getReference() {
  return '/// <reference path="../.meteor/local/build/programs/server/assets/packages/urigo_angular2-meteor/typings/angular2-meteor.d.ts" />';
}
