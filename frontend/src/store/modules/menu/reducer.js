import produce from 'immer';

const INITIAL_STATE = [
  {
    label: 'ENCOMENDAS',
    path: '/orders',
    selected: true,
  },
  {
    label: 'ENTREGADORES',
    path: '/deliverymans',
    selected: false,
  },
  {
    label: 'DESTINATÁRIOS',
    path: '/recipients',
    selected: false,
  },
  {
    label: 'PROBLEMAS',
    path: '/problems',
    selected: false,
  },
];

export default function menu(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@menu/ENTER_ITEM': {
        draft.map((item) => {
          if (item.label === action.payload.label) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          return item;
        });
        break;
      }
      default:
    }
  });
}
