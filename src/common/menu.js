import { isUrl } from '../utils/utils';

const menuData = [{
  name: '基础表单',
  path: 'basic-form'
}, {
  name: '高级表单',
  path: 'advanced-form',
}, {
  name: '查询表格',
  path: 'table-list',
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
