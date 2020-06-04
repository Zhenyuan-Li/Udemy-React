import React, { Component} from 'react';
import ProTypes from 'prop-types';

import classes from './Person.module.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context'
class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                {this.context.authenticated ?
                    <p>Authenticated!</p> : <p>Please Log in.</p>}

                <p onClick={this.props.click}
                    key="i1">I'm {this.props.name}
                    and I'm {this.props.age} years old~
            </p>
                <p key='i2'>{this.props.children}</p>
                <input key="i3"
                    // ref= {inputEl => this.inputElement = inputEl}
                    ref={this.inputElementRef}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
        )
        // return (
        //     <div className={classes.Person}>
        //         <p onClick={this.props.click}
        //             key="i1">I'm {this.props.name}
        //             and I'm {this.props.age} years old~</p>
        //         <p key='i2'>{this.props.children}</p>
        //         <input key="i3" type="text" onChange={this.props.changed}
        //             value={this.props.name} />
        //     </div>
        // )
    }
}

Person.propTypes = {
    click: ProTypes.func,
    name: ProTypes.string,
    age: ProTypes.number,
    changed: ProTypes.func
};

export default withClass(Person, classes.Person);