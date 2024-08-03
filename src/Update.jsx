import React, { useState } from "react";


function Update(props) {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);

    return (
        <article>
            <h2>Update</h2>
            <form onSubmit={event => {
                event.preventDefault();
                const title = event.target.title.value;
                const body = event.target.body.value;
                props.onUpdate(title, body);
            }}>
                <p><input type="text" name="title" placeholder="title" value={title} onChange={e => {
                    setTitle(e.target.value);
                }}/></p>
                <p><textarea name="body" placeholder="body" value={body} onChange={e => {
                    setBody(e.target.value);
                }}></textarea></p>
                <p><input type="submit" value="Update"></input></p>
            </form>
        </article>
    );
}

export default Update;