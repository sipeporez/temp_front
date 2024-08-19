import { atom, selector } from "recoil";

export const modalAtom = atom({
    key: 'modalAtom',
    default: false,
  });

export const modalSel = selector({
  key: 'modalSel', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    return get(modalAtom);
  },
});