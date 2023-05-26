
 const Inputs = ({text, handleInput, handleSubmit}) => {
  return (
        <label>
          <input value={text} onChange={(e) => handleInput(e.target.value)}/>
          <button onClick={handleSubmit}>add to-do</button>
        </label>
  )
}
export default Inputs