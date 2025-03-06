import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import '@/styles/fonts.css';

let navigate = {
    PREVIOUS: 'PREV',
    NEXT: 'NEXT',
    TODAY: 'TODAY',
    DATE: 'DATE',
  }  

class CalendarToolbar extends React.Component {
  render() {
    let {
      localizer: { messages },
      label,
    } = this.props

    return (
      <div className="rbc-toolbar h-50 w-full">
        <div className="rbc-btn-group w-2/7">
        <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {'>'}
          </button>
        </div>

        <div className="rbc-toolbar-label 3/7">{label}</div>

        <div className="rbc-btn-group w-2/7">{this.viewNamesGroup(messages)}</div>
      </div>
    )
  }

  navigate = (action) => {
    this.props.onNavigate(action)
  }

  view = (view) => {
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map((name) => (
        <button
          type="button"
          key={name}
          className={clsx({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

CalendarToolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default CalendarToolbar