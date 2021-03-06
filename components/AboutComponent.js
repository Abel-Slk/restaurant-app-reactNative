import React from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable'; 

const mapStateToProps = state => {
    return {
        leaders: state.leaders 
    }
}

function History() {
    return (
        <Card title='Our History'>
            <Text style={{margin: 10}}>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
            </Text>
            <Text style={{margin: 10}}>
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    );
}

const renderLeaderItem = ({ item, index }) => ( 
    <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{ source: { uri: baseUrl + item.image }}} 
    />
);

function Leaders({ leaders }) {
    if (leaders.isLoading) {
        return (
            <Card title='Corporate Leadership'>
                <Loading />
            </Card>
        );
    }
    else if (leaders.errMess) {
        return (
            <Card title='Corporate Leadership'>
                <Text>{leaders.errMess}</Text>
            </Card>
        );
    }
    else {
        return (
            <Card title='Corporate Leadership'>
                <FlatList
                    data={leaders.leaders} 
                    renderItem={renderLeaderItem} 
                    keyExtractor={item => item.id.toString()} 
                />
            </Card>
        );
    }    
}

class About extends React.Component {

    static navigationOptions = { 
        title: 'About' 
    };

    render() {
        return (
            <ScrollView>

                <Animatable.View animation='fadeInDown' duration={500} delay={0}>
                    <History />

                    <Leaders leaders={this.props.leaders} />
                </Animatable.View>

            </ScrollView>
        );
    }

}

export default connect(mapStateToProps)(About); // in the React app earlier I had one main component which was the only one that was connected to the redux store. Here I connect EACH component directly to the redux store. These are Two different ways of implementing interaction with the redux store