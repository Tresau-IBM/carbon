/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface TagSkeletonProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify the size of the Tag. Currently supports either `sm` or
   * default sizes.
   */
  size?: 'sm';
}

function TagSkeleton({ className, size, ...rest }: TagSkeletonProps) {
  const prefix = usePrefix();
  const tagClasses = classNames(
    `${prefix}--tag`,
    `${prefix}--skeleton`,
    className,
    {
      [`${prefix}--tag--${size}`]: size, // TODO: V12 - Remove this class
      [`${prefix}--layout--size-${size}`]: size,
    }
  );
  return <span className={tagClasses} {...rest} />;
}

TagSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the size of the Tag. Currently supports either `sm` or
   * default sizes.
   */
  size: PropTypes.oneOf(['sm']),
};

export default TagSkeleton;
export { TagSkeleton };
