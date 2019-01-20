import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            data: [],
        };
    }

    handleKey(event) {
        if (event.keyCode === 13 || event.key === 'Enter') {
            this.handleSearch(event);
        }
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    handleSearch() {
        if (this.state.query.length === 3) {
            this.search(this.state.query);
        }
    }

    search(query) {
        return fetch(`https://tomlin.no/api/?service=iata&action=search&query=${query}`)
            .then(response => (response.ok ? response.json() : Promise.reject(response.statusText)))
            .then(response => this.setState({ data: response }))
            .catch(error => console.log(error)); // eslint-disable-line
    }

    static renderItem(data, idx) {
        return (
            <div key={`item${idx}`}>
                <h3>{data.name}</h3>
                <span>
                    IATA <strong>{data.iataCode}</strong> | ICAO <strong>{data.icaoCode}</strong>
                </span>
                <br />
                <span>
                    {data.cityName} ({data.cityCode})
                </span>
                <br />
                <span>
                    {data.area} ({data.areaCode}), {data.country} ({data.countryCode}), {data.continent}
                </span>
                <br />
                <span>IANA Timezone: {data.timezone}</span>
                <br />
                <span>
                    Coordinates: {data.latitude}, {data.longitude}
                </span>
                <br />
                <a href={data.wiki}>{data.wiki}</a>
            </div>
        );
    }

    render() {
        return (
            <>
                <div className="app-input">
                    <input
                        className="app-input-effect"
                        type="text"
                        placeholder="3-letter IATA Code"
                        name="query"
                        aria-label="Search"
                        maxLength="3"
                        value={this.state.query}
                        onClick={event => event.target.select()}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKey.bind(this)}
                    />
                    <span className="focus-border">
                        <i />
                    </span>
                </div>
                {this.state.data.length ? this.state.data.map(Search.renderItem) : <span>No results</span>}
            </>
        );
    }
}
