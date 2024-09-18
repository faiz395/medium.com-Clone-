import algoliasearch from 'algoliasearch';
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { Hit } from "./Hit";
import { useState } from 'react';



const searchClient = algoliasearch('A6775ZQA6S', 'b113d25cab89008c776fe9bca2173b70')

export const Search = ({queryToSearch}) => {
  const [searchVal, setdSearchVal]= useState(queryToSearch)
  return (

    <InstantSearch
      searchClient={searchClient}
      indexName="medium_blog"
    >
      <Configure hitsPerPage={5} />
      <div className="ais-InstantSearch">
        <SearchBox 
         placeholder="Search Posts Here"
         autoFocus={true}
        className='' />
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  );
};