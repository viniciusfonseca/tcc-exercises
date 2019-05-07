import React from 'react'
import { API_URL } from '../api';

const WordThumbnail = ({ query }) =>
    <img src={`${API_URL}/image?q=${query}`} />

const ImageAssociation = ({ exercise, solved }) => {

    return (
        <div className="flex-col">
            <p> Associe as palavras às suas respectivas figuras. </p>
            <div className="flex-row">
                <div className="flex-col flex word-col">
                    <span className="flex-col center-a height-130"> 1. dog </span>
                    <span className="flex-col center-a height-130"> 2. table </span>
                    <span className="flex-col center-a height-130"> 3. book </span>
                    <span className="flex-col center-a height-130"> 4. food </span>
                    <span className="flex-col center-a height-130"> 5. airplane </span>
                    <span className="flex-col center-a height-130"> 6. car </span>
                    <span className="flex-col center-a height-130"> 7. hello </span>
                    <span className="flex-col center-a height-130"> 8. woman </span>
                    <span className="flex-col center-a height-130"> 9. computer </span>
                    <span className="flex-col center-a height-130"> 10. glass </span>
                </div>
                <div className="flex-col flex word-col">
                    <span className="flex-row center-b"><select></select> <WordThumbnail query="book" /> </span>
                    <span className="flex-row center-b"><select></select> <WordThumbnail query="airplane" /> </span>
                    <span className="flex-row center-b"><select></select> <WordThumbnail query="dog" /> </span>
                    <span className="flex-row center-b"><select></select> <WordThumbnail query="hello" /> </span>
                    <span className="flex-row center-b"><select></select> <WordThumbnail query="woman" /> </span>
                    <span className="flex-row center-b"><select></select> <WordThumbnail query="car" /> </span>
                    <span className="flex-row center-b"><select></select> <WordThumbnail query="computer" /> </span>
                    <span className="flex-row center-b"><select></select> <WordThumbnail query="glass" /> </span>
                    <span className="flex-row center-b"><select></select> <WordThumbnail query="table" /> </span>
                    <span className="flex-row center-b"><select></select> <WordThumbnail query="food" /> </span>
                </div>
            </div>
        </div>
    )
}

export default ImageAssociation