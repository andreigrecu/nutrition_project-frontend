import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import ls from 'local-storage';

class SearchFoodPagination extends Component {

    constructor(props) {
        super(props);
        this.state={
            renderAgain: ''
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        
        let items = [];

        items.push( 
            <Pagination.First key={101}
                onClick={() => {
                    this.setState({ renderAgain: true });
                    ls.set('active', 1);
                    this.props.setOffset(0);
                } 
            } 
        />)

        items.push( 
            <Pagination.Prev key={102}
                onClick={() => {
                    if(ls.get('active') > 1) {
                        this.setState({ renderAgain: true });
                        const active = ls.get('active');
                        ls.set('active', active - 1);
                        this.props.setOffset((active - 2) * 10);
                    }
                } 
            } 
        />)

        for(let number = 1; number <= 10; number++) {
            if(number === 1 || number === 2 || number === 8 || number === 9 || number === 10)
                items.push(
                    <Pagination.Item 
                        key={number} 
                        active={number === ls.get('active')} 
                        onClick={() => {
                            ls.set('active', number);
                            this.props.setOffset((number - 1) * 10);
                        }
                    }>
                        {number}
                    </Pagination.Item>
                )
            
            if(number === 4)
                items.push(<Pagination.Ellipsis />)
                
            if(number === ls.get('active') && (number === 3 || number === 4 || number === 5 || number === 6 || number === 7 )) {
                items.push(
                    <Pagination.Item 
                        key={number} 
                        active={number === ls.get('active')} 
                        onClick={() => {
                            ls.set('active', number);
                            this.props.setOffset((number - 1) * 10);
                        }
                    }>
                        {number}
                    </Pagination.Item>
                )
                if(number !== 7 && number !== 3)
                    items.push(<Pagination.Ellipsis />)
            }

        }

        items.push( 
            <Pagination.Next key={103} 
                onClick={() => {
                    if(ls.get('active') < 10) {
                        this.setState({ renderAgain: true });
                        const active = ls.get('active');
                        ls.set('active', active + 1);
                        this.props.setOffset(active * 10);
                    }
                } 
            } 
        />)

        items.push( 
            <Pagination.Last key={104}
                onClick={() => {
                    this.setState({ renderAgain: true });
                    ls.set('active', 10);
                    this.props.setOffset(90);
                } 
            } 
        />)

        const paginationBasic = (
            <div>              
                <Pagination>
                    {items}
                </Pagination>
                <br />
            </div>
        )

        return(
            paginationBasic
        )
    }
}

export default SearchFoodPagination;