import React, { useEffect, useState } from 'react';

function Try() {
    const [bgcolor, setbgColor] = useState("white");
    const [inputbgColor, setInputbgColor] = useState("");

    const [textcolor, settextColor] = useState("black");
    const [inputtextColor, setInputtextColor] = useState("");

    const handleInputbgChange = (event) => {
        setInputbgColor(event.target.value);
    };

    const handleInputtextChange = (event) => {
        setInputtextColor(event.target.value);
    };

    const changebgColor = () => {
        if (inputbgColor) {
            setbgColor(inputbgColor);
            setInputbgColor("");
        }
    };

    const changetextColor = () => {
        if (inputtextColor) {
            settextColor(inputtextColor); // Corrected line
            setInputtextColor("");
        }
    };

    useEffect(() => {
        document.body.style.backgroundColor = bgcolor;
        document.body.style.color = textcolor;
    }, [bgcolor, textcolor]);

    return (
        <>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Ipsam tempore doloribus aut, totam temporibus porro exercitationem
                modi accusamus alias voluptatem id. Sit ea, voluptate quibusdam repellendus
                cupiditate aut? Quaerat, eveniet!
                Iste cum corporis cupiditate
                adipisci illum temporibus nulla at, aliquid, nam sint
                asperiores deleniti numquam quam. Consequatur sit iusto cum nobis quo!
            </div>
            <input
                type="text"
                value={inputbgColor}
                onChange={handleInputbgChange}
                className='border border-3-black'
            />
            <button onClick={changebgColor}>Change Background Color</button>
            <input
                type="text"
                value={inputtextColor}
                onChange={handleInputtextChange}
                className='border border-3-black'
            />
            <button onClick={changetextColor}>Change Text Color</button>
        </>
    );
}

export default Try;