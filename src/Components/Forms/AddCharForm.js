import {useState, useEffect, useRef } from 'react'
import Emoji from 'Components/misc/Emoji';
import { useCharacterHook } from 'utils/hooks'
import { AddCharacterFormWrapper } from '../styles';
import Picker from 'emoji-picker-react';

const AddCharacterForm = () => {
  const [newCharName, setNewCharName] = useState('')
  const { addNewCharacter } = useCharacterHook()
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (_, emojiObject) => {
    console.log(emojiObject)
    setChosenEmoji(emojiObject);
  };

  const handleNewCharChange = (e) => {
    e.preventDefault()
    setNewCharName(e.target.value)
  }

  const handleNewCharSubmit = async (e) => {
    e.preventDefault()
      const newCharacter = {
        storyId: 'drazen05',
        name: 'eventCharacter',
        emoji: chosenEmoji?.emoji,
        desccription: '',
        data: {}
      }
      addNewCharacter(newCharacter)
      setNewCharName('')
    }

return <AddCharacterFormWrapper>
  <h3> Add Character </h3>
  <form onSubmit={handleNewCharSubmit}>


    <input
      value={newCharName}
      placeholder='Character Name'
      onChange={handleNewCharChange}
    />
      {chosenEmoji && chosenEmoji?.emoji}

      <br />
      <br />
    <Picker
      onEmojiClick={onEmojiClick}
      disableAutoFocus={true}
      groupVisibility={{smileys_people: false, recently_used: false}}
      // native
    />
    <br />
    <button type='submit'>Add New Characters<Emoji e={'✅'}/></button>
  </form>
</AddCharacterFormWrapper>
};

export default AddCharacterForm;
