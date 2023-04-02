import React, { ReactNode } from 'react';

export const renderChildren = (children: React.ReactNode, props?: any) => {
  return React.Children.map<ReactNode, ReactNode>(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }

    return child;
  });
};

export const renderChild = (child: React.ReactNode, props?: any) => {
  if (React.isValidElement(child)) {
    return React.cloneElement(child, props);
  }

  return child;
};
