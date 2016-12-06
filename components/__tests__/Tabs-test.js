import React from 'react';
import Tabs from '../Tabs';
import Tab from '../Tab';
import { shallow, mount } from 'enzyme';

describe('Tabs', () => {
  describe('renders as expected', () => {
    describe('navigation (<nav>)', () => {
      const wrapper = shallow(
        <Tabs className="extra-class">
          <Tab label="firstTab">content1</Tab>
          <Tab label="lastTab">content2</Tab>
        </Tabs>
      );

      it('renders [role="navigation"] props on <nav> by default', () => {
        expect(wrapper.find('nav').props().role).toEqual('navigation');
      });

      it('renders [role="tablist"] props on <ul> by default', () => {
        expect(wrapper.find('ul').props().role).toEqual('tablist');
      });

      it('renders extra classes on <nav> via className prop', () => {
        expect(wrapper.find('nav').hasClass('extra-class')).toBe(true);
      });

      it('renders expected classes on <nav> by default', () => {
        expect(wrapper.find('nav').hasClass('bx--tabs')).toBe(true);
      });
    });

    describe('Trigger (<div>)', () => {
      const wrapper = shallow(
        <Tabs className="extra-class">
          <Tab label="firstTab">content1</Tab>
          <Tab label="lastTab">content2</Tab>
        </Tabs>
      );

      const trigger = wrapper.find('div.bx--tabs__trigger');
      const tablist = wrapper.find('ul');

      it('renders default className for trigger', () => {
        expect(trigger.hasClass('bx--tabs__trigger')).toBe(true);
      });

      it('renders hidden className by default', () => {
        expect(tablist.hasClass('bx--tabs--hidden')).toBe(true);
      });

      it('renders default className for triggerText', () => {
        expect(trigger.find('a').hasClass('bx--tabs__trigger-text')).toBe(true);
      });

      it('renders <Icon>', () => {
        expect(trigger.find('Icon').props().name).toEqual('caret--down');
      });
    });

    describe('Children (<Tab>)', () => {
      const wrapper = shallow(
        <Tabs>
          <Tab label="firstTab">content1</Tab>
          <Tab label="lastTab">content2</Tab>
        </Tabs>
      );

      const firstTab = wrapper.find('[label="firstTab"]');
      const lastTab = wrapper.find('[label="lastTab"]');

      it('renders children as expected', () => {
        expect(wrapper.props().children.length).toEqual(2);
      });

      it('renders index prop', () => {
        expect(firstTab.props().index).toEqual(0);
        expect(lastTab.props().index).toEqual(1);
      });

      it('renders selected prop (where firstTab is selected by default)', () => {
        expect(firstTab.props().selected).toEqual(true);
        expect(lastTab.props().selected).toEqual(false);
      });
    });
  });

  describe('Children (<TabContent>)', () => {
    const wrapper = shallow(
      <Tabs>
        <Tab label="firstTab">content1</Tab>
        <Tab label="lastTab">content2</Tab>
      </Tabs>
    );

    it('renders expected className', () => {
      const tabContentClass = 'tab-content';
      expect(wrapper.find('.tab-content').first().hasClass(tabContentClass)).toBe(true);
    });

    it('renders content children as expected', () => {
      expect(wrapper.find('.tab-content').length).toEqual(2);
    });

    it('renders hidden props with boolean value', () => {
      const hiddenProp = wrapper.find('.tab-content').first().props().hidden;
      expect(typeof(hiddenProp)).toBe('boolean');
    });

    it('renders selected props with boolean value', () => {
      const selectedProp = wrapper.find('.tab-content').first().props().hidden;
      expect(typeof(selectedProp)).toBe('boolean');
    });
  });

  describe('events', () => {
    describe('click', () => {
      const wrapper = mount(
        <Tabs>
          <Tab label="firstTab" className="firstTab">content1</Tab>
          <Tab label="lastTab" className="lastTab">content2</Tab>
        </Tabs>
      );

      describe('state: dropdownHidden', () => {
        it('toggles dropdownHidden state after trigger is clicked', () => {
          const trigger = wrapper.find('.bx--tabs__trigger');

          trigger.simulate('click');
          expect(wrapper.state().dropdownHidden).toEqual(false);
          trigger.simulate('click');
          expect(wrapper.state().dropdownHidden).toEqual(true);
        });

        it('toggles hidden state after trigger-text is clicked', () => {
          const triggerText = wrapper.find('.bx--tabs__trigger-text');

          triggerText.simulate('click');
          expect(wrapper.state().dropdownHidden).toEqual(false);
          triggerText.simulate('click');
          expect(wrapper.state().dropdownHidden).toEqual(true);
        });
      });

      describe('state: selectedLabel', () => {
        it('sets a new value for selectedLabel state when Tab is clicked', () => {
          const lastTab = wrapper.find('.lastTab');
          lastTab.simulate('click');
          expect(wrapper.state().selectedLabel).toEqual('lastTab');
        });
      });
    });

    describe('keydown', () => {
      const wrapper = mount(
        <Tabs>
          <Tab label="firstTab" className="firstTab">content</Tab>
          <Tab label="lastTab" className="lastTab">content</Tab>
        </Tabs>
      );

      const firstTab = wrapper.find('.firstTab');
      const lastTab = wrapper.find('.lastTab');
      const leftKey = 37;
      const rightKey = 39;

      describe('state: selected', () => {
        it('updates selected state when pressing arrow keys', () => {
          firstTab.simulate('keydown', { which: rightKey });
          expect(wrapper.state().selected).toEqual(1);
          lastTab.simulate('keydown', { which: leftKey });
          expect(wrapper.state().selected).toEqual(0);
        });

        it('loops focus and selected state from lastTab to firstTab', () => {
          lastTab.simulate('keydown', { which: rightKey });
          expect(wrapper.state().selected).toEqual(0);
        });

        it('loops focus and selected state from firstTab to lastTab', () => {
          firstTab.simulate('keydown', { which: leftKey });
          expect(wrapper.state().selected).toEqual(1);
        });
      });
    });
  });

  describe('default state', () => {
    const wrapper = mount(
      <Tabs>
        <Tab label="firstTab" className="firstTab">content</Tab>
        <Tab label="lastTab" className="lastTab">content</Tab>
      </Tabs>
    );

    describe('dropdownHidden', () => {
      it('should be true', () => {
        expect(wrapper.state().dropdownHidden).toEqual(true);
      });
    });

    describe('selected', () => {
      it('should be 0', () => {
        expect(wrapper.state().selected).toEqual(0);
      });
    });

    describe('selectedLabel', () => {
      it('should be a string', () => {
        const string = typeof(wrapper.state().selectedLabel);
        expect(string).toBe('string');
      });

      it('selectedLabel and firstTab label should be the same', () => {
        expect(wrapper.state().selectedLabel).toEqual('firstTab');
      });
    });
  });
});
