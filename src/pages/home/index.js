import React from 'react';
import { Categories } from './categories';
import './index.css';

export function Home() {
  return (
    <section className='home'>
      <header className='home_header flex align_center justify_center'>
        <section className='flex align_center justify_center flex_dcolumn'>
          <h1 className='text_center home_title'>View your favourite club videos</h1>
          <button className='btn btn_primary explore_btn'>Explore Videos</button>
        </section>
      </header>
      <div className='home_categories'>
        <Categories />
      </div>
    </section>
  )
}