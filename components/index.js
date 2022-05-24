// Import Everything from the react library and the component 
// we created in the components folder and export it,
// so that it can be used in the index.js file in the root of the project,
// This is the main file that will be used to render the component in the index.html file.
import PageLayout from './layout/pageLayout'
import MainLayout from './layout/main'
import DefaultLayout from './layout/default'
import PageName from './page_components/PageName'
import CustomSelect from './form-element/CustomSelect'
import InputField from './form-element/InputField'
import Spinner from './util/Spinner'
import Pagination from './pagination/Pagination'

export {
    PageLayout,
    MainLayout,
    DefaultLayout,
    PageName,
    CustomSelect,
    InputField,
    Spinner,
    Pagination
}
