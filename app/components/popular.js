var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function Selectlanguage (props) {
    var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];            
    return (
        <ul className='languages'>
            {languages.map((lang) => {
                return(
                    <li 
                        style={lang === props.selectedLanguage ? { color: '#d0021b'}: null}
                        onClick={ props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )
}


class Popular extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null,
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount () {
        api.fetchPopularRepos(this.state.selectedLanguage)
            .then(function (repos) {
                console.log(repos)
            })
    }
    updateLanguage(lang) {
        this.setState(function () {
            return{
                selectedLanguage: lang
            }
        });
    }

    render() {
        return (
            <div>
                <Selectlanguage 
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}/>    
            </div>
        )
    }
}

module.exports = Popular;