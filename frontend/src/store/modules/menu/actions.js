export function changeItem(label) {
  return {
    type: '@menu/ENTER_ITEM',
    payload: { label },
  };
}
