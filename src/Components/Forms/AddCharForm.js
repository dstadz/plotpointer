import {useState, useEffect, useRef } from 'react'
import Emoji from 'Components/misc/Emoji';
import { useCharacterHook } from 'utils/hooks'
import { AddCharFormWrapper } from '../styles';
import Picker from 'emoji-picker-react';

export const AddCharForm = ({ setAddCharUp }) => {
  const [newCharName, setNewCharName] = useState('')
  const [isPickerUp, setPickerUp] = useState(false)
  const { addNewCharacter } = useCharacterHook()
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (_, emojiObject) => { setChosenEmoji(emojiObject); };
  const togglePickerUp = () => { setPickerUp(wasUp => !wasUp) }

  const handleNewCharChange = (e) => {
    e.preventDefault()
    setNewCharName(e.target.value)
  }

  const handleNewCharSubmit = async (e) => {
    e.preventDefault()
      const newCharacter = {
        storyId: 'drazen05',
        name: newCharName,
        emoji: chosenEmoji?.emoji,
        desccription: '',
        data: {}
      }
      addNewCharacter(newCharacter)
      setAddCharUp(false)
      setPickerUp(false)
      setNewCharName('')
    }

return <AddCharFormWrapper>
  <div className="header">
    <h3> Add Character </h3>
    <button onClick={()=> setAddCharUp(false)}><Emoji e={'❌'}/></button>
  </div>

  <form onSubmit={handleNewCharSubmit}>


    <input
      value={newCharName}
      placeholder='Character Name'
      onChange={handleNewCharChange}
    />
      {chosenEmoji && chosenEmoji?.emoji}

      <br />
      <br />
    {isPickerUp
      ? <Picker
          onEmojiClick={onEmojiClick}
          groupVisibility={{smileys_people: false, recently_used: false}}
        />
      : <button onClick={togglePickerUp}>
          add Emoji <Emoji e={'😀'}/>
        </button>
      }<br />
    <button type='submit'>Add New Character<Emoji e={'✅'}/></button>
  </form>
</AddCharFormWrapper>
}
