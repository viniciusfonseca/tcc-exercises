import React from 'react'

const FillInTheBlank = ({ exercises, solved }) => {

    return (
        <React.Fragment>
            <div>
                <p> Preencha as lacunas com as palavras mais adequadas. </p>
            </div>
            <div class="words">
                <span class="word-drag"> airplane </span>
                <span class="word-drag"> book </span>
                <span class="word-drag"> car </span>
                <span class="word-drag"> food </span>
                <span class="word-drag"> dog </span>
                <span class="word-drag"> hello </span>
                <span class="word-drag"> computer </span>
                <span class="word-drag"> woman </span>
            </div>
            <div class="fill">
                <div>
                    1. I want to read a new <span class="blank"></span>.
                </div>
                <div>
                    2. Yesterday, I bought a new <span class="blank"></span> to hit the road.
                </div>
                <div>
                    3. Today, I will travel by <span class="blank"></span> for the first time.
                </div>
                <div>
                    4. Next week, I will take my <span class="blank"></span> to the veterinary.
                </div>
                <div>
                    5. I want to go to the grocery store and buy some <span class="blank"></span>.
                </div>
                <div>
                    6. I like to play games on the <span class="blank"></span>.
                </div>
                <div>
                    7. <span class="blank"></span>, Jack! Nice to meet you.
                </div>
            </div>
        </React.Fragment>
    )
}

export default FillInTheBlank