import PropTypes from 'prop-types';
import React, { useState, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import Checkbox, { CheckboxProps } from './Checkbox';
import { noopFn } from '../../internal/noopFn';

export enum NestedCheckboxStates {
  Checked,
  Indeterminate,
  Unchecked,
}

export interface NestedCheckboxProps extends CheckboxProps {
  /**
   * Provide a collection of `<Checkbox>` components to render in the group
   */
  children?: ReactNode;
}

const NestedCheckbox = React.forwardRef(
  ({
    checked,
    children,
    className,
    defaultChecked,
    invalid,
    onChange = noopFn,
    readOnly,
    warn,
    slug,
    ...rest
  }: NestedCheckboxProps) => {
    const [checkState, setCheckState] = useState(
      checked || defaultChecked
        ? NestedCheckboxStates.Checked
        : NestedCheckboxStates.Unchecked
    );
    const prefix = usePrefix();
    const showWarning = !readOnly && !invalid && warn;
    const wrapperClasses = classNames(
      `${prefix}--form-item`,
      `${prefix}--nested-checkbox-wrapper`,
      className,
      {
        [`${prefix}--nested-checkbox-wrapper--readonly`]: readOnly,
        [`${prefix}--nested-checkbox-wrapper--invalid`]: !readOnly && invalid,
        [`${prefix}--nested-checkbox-wrapper--warning`]: showWarning,
        [`${prefix}--nested-checkbox-wrapper--slug`]: slug,
      }
    );

    const handleOnChange = (event, { checked, id }) => {
      setCheckState((prev) => {
        return prev === NestedCheckboxStates.Checked ||
          prev === NestedCheckboxStates.Indeterminate
          ? NestedCheckboxStates.Unchecked
          : NestedCheckboxStates.Checked;
      });
      if (typeof onChange === 'function') {
        onChange(event, { checked, id });
      }
    };

    function getCheckboxes() {
      const mappedChildren = React.Children.map(children, (checkbox) => {
        if (checkbox) {
          const { checked, onChange } =
            (checkbox as ReactElement)?.props ?? undefined;
          const handleChildChange = (event, { checked, id }) => {
            setCheckState(
              checked
                ? NestedCheckboxStates.Indeterminate
                : NestedCheckboxStates.Unchecked
            );
            if (typeof onChange === 'function') {
              onChange(event, { checked, id });
            }
          };
          const newProps = {
            checked:
              checkState === NestedCheckboxStates.Checked ? true : checked,
            onChange: handleChildChange,
          };
          return React.cloneElement(checkbox as ReactElement, newProps);
        }
      });

      return mappedChildren;
    }

    return (
      <div className={wrapperClasses}>
        <Checkbox
          checked={checkState === NestedCheckboxStates.Checked}
          defaultChecked={defaultChecked}
          indeterminate={checkState === NestedCheckboxStates.Indeterminate}
          invalid={invalid}
          onChange={handleOnChange}
          readOnly={readOnly}
          warn={warn}
          slug={slug}
          {...rest}
        />
        <div className={`${prefix}--nested-checkbox__children`}>
          {getCheckboxes()}
        </div>
      </div>
    );
  }
);

NestedCheckbox.propTypes = {
  /**
   * Specify whether the underlying input should be checked
   */
  checked: PropTypes.bool,

  /**
   * The list of children checkboxes to be within this nested CheckBox
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the <label> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked: PropTypes.bool,

  /**
   * Specify whether the Checkbox should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text for the form group for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide an `id` to uniquely identify the Checkbox input
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  indeterminate: PropTypes.bool,

  /**
   * Specify whether the Checkbox is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the Checkbox is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Provide an optional handler that is called when the internal state of
   * Checkbox changes. This handler is called with event and state info.
   * `(event, { checked, id }) => void`
   */
  onChange: PropTypes.func,

  /**
   * Specify whether the Checkbox is read-only
   */
  readOnly: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Checkbox` component
   */
  slug: PropTypes.node,

  /**
   * Specify a title for the <label> node for the Checkbox
   */
  title: PropTypes.string,

  /**
   * Specify whether the Checkbox is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the Checkbox is in warning state
   */
  warnText: PropTypes.node,
};

NestedCheckbox.displayName = 'NestedCheckbox';

export default NestedCheckbox;
