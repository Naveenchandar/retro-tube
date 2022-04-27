import React from 'react';
import './index.css';

const chipValues = ['all', 'rm', 'mu', 'ju', 'bm'];
const chipClassName = 'p-1 chips_item';

export function Chips({ activeChip, changeChip}) {

  const loadActiveClassName = (val) => {
    if (chipValues.includes(activeChip) && activeChip === val) {
      return `${chipClassName} active_chip`;
    }
    return chipClassName;
  }

  return (
    <div className='chips p-1'>
      <ul className='flex'>
        <li className={loadActiveClassName('all')} onClick={() => changeChip('all')}>All</li>
        <li className={loadActiveClassName('rm')} onClick={() => changeChip('rm')}>Real Madrid</li>
        <li className={loadActiveClassName('mu')} onClick={() => changeChip('mu')}>Manchester United</li>
        <li className={loadActiveClassName('ju')} onClick={() => changeChip('ju')}>Juventus</li>
        <li className={loadActiveClassName('bm')} onClick={() => changeChip('bm')}>Bayern Munich</li>
      </ul>
    </div>
  )
}