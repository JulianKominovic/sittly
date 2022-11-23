const fs = require('fs');
const path = require('path');

const matches = fs.readdirSync(path.resolve('src/assets/icons/scalable'));

// const filter = matches
//   .filter((file) => /-symbolic\.svg/.test(file))
//   .forEach((file) => {
//     console.log();
//     fs.renameSync(
//       path.resolve('src/assets/icons/scalable/' + file),
//       path.resolve('src/assets/icons/scalable/' + file.replace(/-symbolic\.svg/, '.svg') + '.svg')
//     );
//   });

matches.forEach((file) => {
  const ocurr = file.match(/\.svg/g)?.length > 1;
  console.log(file, ocurr);
  if (ocurr) {
    console.log(
      path.resolve('src/assets/icons/scalable/' + file),
      path.resolve('src/assets/icons/scalable/' + file.replace(/\.svg/, ''))
    );
    fs.renameSync(
      path.resolve('src/assets/icons/scalable/' + file),
      path.resolve('src/assets/icons/scalable/' + file.replace(/\.svg/, ''))
    );
  }
  return ocurr;
});
