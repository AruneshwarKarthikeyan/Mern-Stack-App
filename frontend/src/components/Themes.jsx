import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"

//  image(themes) imports
import img1 from '../assets/themes/default.jpg'
import img2 from '../assets/themes/mountain.jpg'
import img3 from '../assets/themes/dark-forest.jpg'
import img4 from '../assets/themes/luna.jpg'
import img5 from '../assets/themes/winter.jpg'
import img6 from '../assets/themes/tropical-forest-1.jpg'
import img7 from '../assets/themes/sepia.jpg'
import img8 from '../assets/themes/tropical-forest-2.jpg'

// redux reducer import
import { hideThemeWindow } from "../redux/theme/themeSlice"

function Themes() {
    const themes = [
        { name: "Default", image: img1 },
        { name: "Dawn", image: img2 },
        { name: "Forest", image: img3 },
        { name: "Luna", image: img4 },
        { name: "Winter", image: img5 },
        { name: "Tropic-forest-1", image: img6 },
        { name: "Sepia", image: img7 },
        { name: "Tropic-forest-2", image: img8 },

    ];
    const { isThemeVisible } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    const changeBackground = (item) => {
        document.body.style.backgroundImage = `url(${item.image})`;
    }

    return (
        <div id="themes-panel" style={{ display: isThemeVisible ? 'block' : 'none' }}>
            <div id="top-bar">
                <h3>Themes</h3>
                <FontAwesomeIcon icon={faXmark} id="themes-close-btn" onClick={() => dispatch(hideThemeWindow())} />
            </div>
            <div id="themes-section">
                {
                    themes.map((item) => (
                        <div id="theme" key={item.name}>
                            <img src={item.image} alt={item.name[0]} onClick={() => { changeBackground(item) }} style={{ height: "100px", width: "100px" }} />
                            <p>{item.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Themes

