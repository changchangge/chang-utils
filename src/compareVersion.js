function compareVersion(version, baseversion) {
  const versionArr = version.split('.').map((e) => {
    return e.replace(/[^0-9]/gi, '');
  });
  const baseversionArr = baseversion.split('.').map((e) => {
    return e.replace(/[^0-9]/gi, '');
  });
  console.log(versionArr, baseversionArr);
  if (versionArr.join() === baseversionArr.join()) {
    return 0;
  }
  for (let i = 0; i < version.length; i++) {
    if (versionArr[i] > baseversionArr[i]) {
      return 1;
    }
  }
  return -1;
}

export default compareVersion;
