import React, {Component} from 'react';
import ShopData from './shop.data';
import CollectionPreview from '../../components/collection.component/collection-preview.component';

class ShopPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            collections: ShopData
        }
    }
    render(){
        const {collections} = this.state;
        return (<div>
            {
                collections.map(({id, ...otherCollectionProps }) =>(
                    <CollectionPreview key={id} {...otherCollectionProps}></CollectionPreview>
                ))
            }
        </div>);
    }

}
export default ShopPage;