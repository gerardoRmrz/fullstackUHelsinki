const Notification = ({ message })=>{

    if ((message.text === '') ){    
        return null
    }

    const messageStyle = {
        color: message.color,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid'
    }
      

    return (
        <div style={messageStyle} className='notification'>
            {message.text}
        </div>
    )
}

export default Notification


