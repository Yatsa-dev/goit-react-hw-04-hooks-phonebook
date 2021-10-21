import s from './Filter.module.css'
import PropTypes from 'prop-types';

export default function Filter({value,onChange}){
    return(
<label> 
    <p className={s.text}>Find contacts by name</p>
    <input 
    type="text"
    value={value}
    onChange={onChange}/>
</label>
    )
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };