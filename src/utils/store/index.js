import { atom, useRecoilState } from 'recoil';

export const elementsState = atom({
  key: 'elementsState',
  default: []
})

export const ActiveNodeState = atom({
  key: 'ActiveNodeState',
  default: {}
})

// export const elementsState = atom({
//   key: 'elementsState',
//   default: []
// })
