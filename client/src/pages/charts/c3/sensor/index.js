import React from 'react'
import C3Chart from 'react-c3js'

const ChartsC3 = () => {
  const colors = {
    primary: '#01a8fe',
    def: '#acb7bf',
    success: '#46be8a',
    danger: '#fb434a',
  }

  const zoom = {
    data: {
      columns: [
        [
          'Sample',
          30,
          200,
          100,
          400,
          150,
          250,
          150,
          200,
          170,
          240,
          350,
          150,
          100,
          400,
          150,
          250,
          150,
          200,
          170,
          240,
          100,
          150,
          250,
          150,
          200,
          170,
          240,
          30,
          200,
          100,
          400,
          150,
          250,
          150,
          200,
          170,
          240,
          350,
          150,
          100,
          400,
          350,
          220,
          250,
          300,
          270,
          140,
          150,
          90,
          150,
          50,
          120,
          70,
          40,
        ],
      ],
      colors: {
        Sample: colors.primary,
      },
    },
    zoom: {
      enabled: !0,
    },
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <h5 className="mb-4">
                <strong>Zoom</strong>
              </h5>
              <div className="mb-5">
                <C3Chart data={zoom.data} color={zoom.color} zoom={zoom.zoom} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartsC3
