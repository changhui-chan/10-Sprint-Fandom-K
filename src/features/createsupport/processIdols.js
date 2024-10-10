const processIdols = (list) => {
  const genderList = ['남', '여'];
  const groupList = {
    성별: [],
    남: [],
    여: [],
  };
  const memberList = {
    그룹명: [],
  };

  list.forEach((el) => {
    if (el.gender === 'male') {
      if (groupList['남'].indexOf(`${el.group}`) < 0) {
        groupList['남'].push(el.group);
        memberList[`${el.group}`] = [];
        memberList[`${el.group}`].push(`${el.name}`);
      } else if (groupList['남'].indexOf(`${el.group}`) >= 0) {
        if (memberList[`${el.group}`].indexOf(`${el.name}`) < 0)
          memberList[`${el.group}`].push(`${el.name}`);
      }
    } else if (el.gender === 'female') {
      if (groupList['여'].indexOf(`${el.group}`) < 0) {
        groupList['여'].push(el.group);
        memberList[`${el.group}`] = [];
        memberList[`${el.group}`].push(`${el.name}`);
      } else if (groupList['여'].indexOf(`${el.group}`) >= 0) {
        if (memberList[`${el.group}`].indexOf(`${el.name}`) < 0)
          memberList[`${el.group}`].push(`${el.name}`);
      }
    }
  });

  Object.keys(groupList).map((key) => groupList[`${key}`].sort());
  Object.keys(memberList).map((key) => memberList[`${key}`].sort());

  return { genderList, groupList, memberList };
};

export default processIdols;
