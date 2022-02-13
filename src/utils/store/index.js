import { atom, useRecoilState } from 'recoil';

export const elementsState = atom({
  key: 'elementsState',
  default: []
})

export const ActiveNodeState = atom({
  key: 'ActiveNodeState',
  default: {}
})

export const allCharacterListState = atom({
  key: 'allCharacterListState',
  default: []
})

export const ActiveCharacterState = atom({
  key: 'ActiveCharacterState',
  default: {}
})

export const isEditingState = atom({
  key: 'isEditingState',
  default: false
})

export const ActiveStoryState = atom({
  key: 'ActiveStoryState',
  default: {}
})


// export const elementsState = atom({
//   key: 'elementsState',
//   default: []
// })

// export const elementsState = atom({
//   key: 'elementsState',
//   default: []
// })
