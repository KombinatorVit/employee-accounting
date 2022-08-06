import './search-panel.css';
import React, {ChangeEvent, Component} from 'react';

class SearchPanel extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            term: ''
        }
    }
    onUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value
        this.setState({term})
        this.props.onUpdateSearch(term)
    }

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="Найти сотрудника"
            value={this.state.term}
            onChange={this.onUpdateSearch}/>
        );
    }
}

export default SearchPanel;