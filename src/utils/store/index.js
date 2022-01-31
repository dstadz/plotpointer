import { atom, useRecoilState } from 'recoil';

export const elementsState = atom({
  key: 'elementsState',
  default: []
})

export const ActiveNodeState = atom({
  key: 'ActiveNodeState',
  default: {}
})

export const charactersState = atom({
  key: 'charactersState',
  default: []
})

export const ActiveCharacterState = atom({
  key: 'ActivecharactersState',
  default: {}
})

export const isEditingState = atom({
  key: 'isEditingState',
  default: false
})

// export const elementsState = atom({
//   key: 'elementsState',
//   default: []
// })

// export const elementsState = atom({
//   key: 'elementsState',
//   default: []
// })
