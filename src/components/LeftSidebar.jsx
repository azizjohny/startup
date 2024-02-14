
import { Link } from 'react-router-dom';
import './LeftSidebar.css';

const LeftSidebar = ({ expandedCategory, setExpandedCategory }) => {

  const categoryGroups = {
    "Mobil telefonlar va aksessuarlar": ["Smartfonlar", "Quloqchinlar", "Mikrofonlar", "Smartsoatlar", "Planshetlar"],
    "Kompyuterlar va aksessuarlar": ["Noutbuklar", "Monitorlar", "Klaviaturalar", "Sichqonchalar", "Printerlar va skanerlar", "USB xotira-fleshkalari", "Tarmoq qurilmalari (Wi-Fi routerlar)"],
    "Uy jihozlari": ["Televizorlar", "Havoni tozaluvchi va namlovchi jihozlar", "Suv isitgichlar", "Isitgichlar"],
    "Oshxona jihozlari": ["Muzlatgichlar", "Gaz plitalari", "Mikroto'lqinli pechlar", "Tutun tortgichlar", "Qahva mashinalari", "Sharbat chiqargichlar", "Multivarkalar", "Blenderlar", "Elektr choynaklar", "Pishirish panellari", "Idish yuvish mashinalari", "Duxovkalar va pechlar", "Mini pechlar", "Plitalar"],
    "Maishiy texnika": ["Kir yuvish mashinalari", "Changyutgich", "Konditsionerlar", "Ventilatorlar", "Dazmollar", "Tikuv mashinalari"],
    "Shaxsiy gigiena uskunalari": ["Soch quritgichlar", "Soch olish mashinalari", "DEPILYATORLAR", "Soch to'g'rilash uskunalari va ploykalar", "Elektr Tish cho’tkalari"]
    // ... (add more categories as needed)
  };

  const toggleCategory = (mainCategory) => {
    setExpandedCategory(prevCategory =>
      prevCategory === mainCategory ? null : mainCategory
    );
  };

  const handleSubCategoryClick = () => {
    setExpandedCategory(null); // Close the category details pane
  };

  return (
    <div className="left-sidebar">
      {/* Sidebar structure */}
      <div className="sidebar-container">
        <h3>Mahsulotlar</h3>
        {Object.entries(categoryGroups).map(([mainCategory, subCategories]) => (
          <div
            key={mainCategory}
            onClick={() => toggleCategory(mainCategory)}
            className="main-category"
          >
            {mainCategory}
          </div>
        ))}
      </div>

      {/* Details pane structure */}
      <div className={`category-details-pane ${expandedCategory ? 'open' : ''}`}>
        {expandedCategory && (
          <ul>
            {categoryGroups[expandedCategory].map((subCategory) => (
              <li key={subCategory} onClick={handleSubCategoryClick}>
                <Link to={`/products?category=${subCategory}`}>{subCategory}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;