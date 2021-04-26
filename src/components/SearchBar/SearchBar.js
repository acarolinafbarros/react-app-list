import React from "react";
import "./SearchBar.css";

export const SearchBar = ({ searchValue, onChange }) => {
	return (
		<input
			className='input'
			value={searchValue}
			onChange={event => onChange(event.target.value)}
			placeholder='Search by App Name'>
		</input>		
	);
};
