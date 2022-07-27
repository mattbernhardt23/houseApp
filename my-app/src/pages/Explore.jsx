import {Link} from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import Slider from '../components/Slider'

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        <Slider />
        <p className="exploreCategoryHeading">
          Categories
        </p>
        <div className="exploreCategories">
          <Link to="/category/rent">
              <img 
                src={rentCategoryImage} 
                alt="rent"
                className='exploreCategoryImg' />
          </Link>
          <p className="exploreCategoryName">
            Places For Rent
          </p>
          <Link to="/category/sale">
              <img 
                src={sellCategoryImage} 
                alt="sell"
                className='exploreCategoryImg' />
          </Link>
          <p className="exploreCategoryName">
            Places For Sale
          </p>
        </div>
      </main>
    </div>
  )
}

export default Explore