/**
 * @flow
 * @file Base class for the content picker ES6 wrapper
 * @author Box
 */

import React from 'react';
import { render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentPickerPopup from '../components/ContentPicker/ContentPickerPopup';
import ContentPickerComponent from '../components/ContentPicker/ContentPicker';
import { TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK, CLIENT_NAME_CONTENT_PICKER } from '../constants';
import type { BoxItem, ModalOptions } from '../flowTypes';

class ContentPicker extends ES6Wrapper {
    /**
     * Callback for pressing choose
     *
     * @param {Array} data - chosen box items
     * @return {void}
     */
    onChoose = (data: BoxItem[]): void => {
        this.emit('choose', data);
    };

    /**
     * Callback for pressing cancel
     *
     * @return {void}
     */
    onCancel = (): void => {
        this.emit('cancel');
    };

    /**
     * Returns the type of content picker
     *
     * @return {void}
     */
    getType(): string {
        const { type } = this.options || {};
        return type || `${TYPE_FOLDER},${TYPE_FILE},${TYPE_WEBLINK}`;
    }

    /**
     * Returns the name for content picker
     *
     * @return {void}
     */
    getClientName(): string {
        return CLIENT_NAME_CONTENT_PICKER;
    }

    /** @inheritdoc */
    render() {
        const { modal, ...rest }: { modal?: ModalOptions } = this.options;
        const PickerComponent = modal ? ContentPickerPopup : ContentPickerComponent;
        render(
            <PickerComponent
                clientName={this.getClientName()}
                getLocalizedMessage={this.getLocalizedMessage}
                componentRef={this.setComponent}
                rootFolderId={this.root}
                token={this.token}
                type={this.getType()}
                onCancel={this.onCancel}
                onChoose={this.onChoose}
                modal={modal}
                {...rest}
            />,
            this.container
        );
    }
}

export default ContentPicker;
