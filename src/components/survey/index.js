import React from 'react';
import surveyService from '../../services/survey.service';
import './survey.css';

class SurveyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           surveyData: null,
        }
    }

    componentDidMount = () => {
        this.loadSurvey();
    }

    loadSurvey = async () => {
        this.setState({
            surveyData: null,
        })
        try {
            let response = [];
            response = await surveyService.getSurvey();
            this.setState({
                ...this,
                surveyData: response,
            })
        } catch (e) {
            console.error(JSON.stringify(e));
            alert('Error loading survey');
        }
    }

    saveSurvey = async () => {
        let { surveyData } = this.state;
        surveyData.questions.forEach(question => {
            question.answear = this.state[question.id];
        });
        try {
            await surveyService.saveSurvey(surveyData);
            alert('Survey saved');
            this.loadSurvey();
        } catch (e) {
            console.error(JSON.stringify(e));
            alert('Error saving survey');
        }
    }

    handleChange = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    render() {
        const { surveyData } = this.state;
        return (
            
            <section>
                {
                    surveyData !== null ?
                    <h1>{surveyData.name}</h1>
                    :''
                }
                {
                    surveyData !== null ?
                        surveyData.questions.map(survey => {
                            return <div key={survey.id} className="question">
                                <div>
                                    <label>{survey.question}</label>
                                </div>
                                <div>
                                    <input type="text"
                                        name={survey.id}
                                        onChange={e => this.handleChange(e.target.name, e.target.value)}></input>
                                </div>
                            </div>
                        }) 
                        : ''
                }
                <div>
                    <button onClick={this.saveSurvey} className="button">Submit</button>
                </div>
            </section >
        );
    }
}

export default SurveyComponent
