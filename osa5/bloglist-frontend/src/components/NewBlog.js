import React from 'react'

const NewBlog = (props) => {
    return (
        <form onSubmit={props.handleNewBlog}>
            <h1>create new</h1>
            <div>
                title:
                <input 
                    type="text"
                    value={props.title}
                    name="Title"
                    onChange={({target}) => props.setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input 
                    type="text"
                    value={props.author}
                    name="Author"
                    onChange={({target}) => props.setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input 
                    type="text"
                    value={props.url}
                    name="Url"
                    onChange={({target}) => props.setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default NewBlog