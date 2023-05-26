const InputField = ({text, handleInput, handleSubmit}) => {
    return (
      <label>
          <input vlaue={text} onChange={(e) => handleInput(e.target.value)}/>
          <button onClick={handleSubmit}>add to-do</button>
        </label>
    )
  }

  export  default InputField