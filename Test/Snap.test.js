import React  from "react"
import "react-native"
import renderer from "react-test-renderer"
import Home from "../Screens/Home"

it('Snapshot test', () => {
            const result= renderer.create(<Home />).toJSON();
            expect(result).toMatchSnapshot();
  });