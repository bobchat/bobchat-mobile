import React from 'react';
import { Keyboard, View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';

class TabBarComponent extends React.PureComponent {
  hideTabBarScreenList = [
    'CreateRoom',
    'RoomDetails',
  ];

  constructor(props) {
    super(props);

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);

    this.state = {
      isVisible: true,
    };
  }

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = () => {
    this.setState({
      isVisible: false,
    });
  };

  keyboardWillHide = () => {
    this.setState({
      isVisible: true,
    });
  };

  getScreen = () => {
    let routes = [];
    let currentIndex = 0;
    let route = null;
    do {
      if (!currentIndex) {
        currentIndex = this.props.navigation.state['index'];
        routes = this.props.navigation.state.routes;
        route = routes[currentIndex];
      } else {
        currentIndex = route['index'];
        if (!currentIndex) {
          // route = route; this is uneeded
        } else {
          route = route.routes[currentIndex];
        }
      }
    } while (currentIndex);
    return route;
  };

  render() {
    let currentScreen = this.getScreen();
    return this.state.isVisible && !this.hideTabBarScreenList.some(screen => {
      return screen == currentScreen.routes[currentScreen.routes.length-1].routeName;
    }) ? (
      <View style={{ alignItems: 'center' }}>
        <BottomTabBar
          {...this.props}
          navigation={{
            ...this.props.navigation,
            state: {
              ...this.props.navigation.state,
              routes: this.props.navigation.state.routes
                .filter(r => r.routeName !== 'SocialTab')
                .filter(r => r.routeName !== 'TransactionTab'),
            },
          }}
        />
      </View>
    ) : null;
  }
}

export default TabBarComponent;
