import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Tooltip } from 'antd'
import { debounce } from 'lodash'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({
  isSidebarOpen: settings.isSidebarOpen,
  isMenuCollapsed: settings.isMenuCollapsed,
  isMenuShadow: settings.isMenuShadow,
  isMenuUnfixed: settings.isMenuUnfixed,
  menuLayoutType: settings.menuLayoutType,
  menuColor: settings.menuColor,
  authPagesColor: settings.authPagesColor,
  isTopbarFixed: settings.isTopbarFixed,
  isContentMaxWidth: settings.isContentMaxWidth,
  isAppMaxWidth: settings.isAppMaxWidth,
  isGrayBackground: settings.isGrayBackground,
  isGrayTopbar: settings.isGrayTopbar,
  isCardShadow: settings.isCardShadow,
  isSquaredBorders: settings.isSquaredBorders,
  isBorderless: settings.isBorderless,
  routerAnimation: settings.routerAnimation,
  locale: settings.locale,
  theme: settings.theme,
  primaryColor: settings.primaryColor,
  leftMenuWidth: settings.leftMenuWidth,
  logo: settings.logo,
})

const Sidebar = ({
  dispatch,
  theme,
  primaryColor,
}) => {
  const [defaultColor] = useState('#4b7cf3')

  const selectColor = debounce(color => {
    dispatch({
      type: 'settings/SET_PRIMARY_COLOR',
      payload: {
        color,
      },
    })
  }, 200)

  const setTheme = nextTheme => {
    dispatch({
      type: 'settings/SET_THEME',
      payload: {
        theme: nextTheme,
      },
    })
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'menuColor',
        value: nextTheme === 'dark' ? 'dark' : 'light',
      },
    })
  }

  const resetColor = () => {
    dispatch({
      type: 'settings/SET_PRIMARY_COLOR',
      payload: {
        color: defaultColor,
      },
    })
  }


 


  return (
    <div>
     
      <Tooltip title="Switch Dark / Light Theme" placement="left">
        <a
          role="button"
          tabIndex="0"
          onFocus={e => {
            e.preventDefault()
          }}
          onKeyPress={() => setTheme(theme === 'default' ? 'dark' : 'default')}
          onClick={() => setTheme(theme === 'default' ? 'dark' : 'default')}
          style={{ bottom: 'calc(50% + 60px)' }}
          className={style.cui__sidebar__toggleButton}
        >
          {theme === 'default' && <i className="fe fe-moon" />}
          {theme !== 'default' && <i className="fe fe-sun" />}
        </a>
      </Tooltip>
      <Tooltip title="Set Primary Color" placement="left">
        <a
          style={{ bottom: 'calc(50%)' }}
          className={`${style.cui__sidebar__toggleButton} ${style.color} ${
            primaryColor === defaultColor ? style.reset : ''
          }`}
        >
          <button
            type="button"
            tabIndex="0"
            onFocus={e => {
              e.preventDefault()
            }}
            onKeyPress={resetColor}
            onClick={resetColor}
          >
            <i className="fe fe-x-circle" />
          </button>
          <input
            type="color"
            id="colorPicker"
            onChange={e => selectColor(e.target.value)}
            value={primaryColor}
          />
          <i className="fe fe-package" />
        </a>
      </Tooltip>
    
    </div>
  )
}

export default connect(mapStateToProps)(Sidebar)
