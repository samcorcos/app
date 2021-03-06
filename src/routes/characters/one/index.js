import reactStamp from 'react-stamp';
import connectToModel from 'behaviours/connect-to-model';
import withShallowCompare from 'behaviours/with-shallow-compare';
import { FlexLayout } from 'components/flex';
import Avatar from 'components/characters/avatar';
import Attributes from 'components/characters/attributes';
import Dna from 'components/characters/dna';
import Relationships from 'components/characters/relationships';
import EditorFactory from 'components/outlines/editor';
import { UploadDropzone } from 'components/files/upload';
import modelToProps from './model-to-props';
import actions from './actions';

export default ( React, ...behaviours ) => {
  const Editor = EditorFactory( React, withShallowCompare );

  return connectToModel( React, modelToProps, actions, props => {
    const {
      world_id,
      _id,
      name,
      avatar,
      cover,
      aliases = [],
      relationships = [],
      genes = [],
      content,
      attributes,
      randomGene,

      setName,
      setAliases,
      setAvatar,
      setCover,
      setOutline,
      changeAttribute,
      addAttribute,
      changeGene,
      addGene,
      getRandomGene,
    } = props;

    const styles = {
      avatar: {
        marginBottom: '20px',
      },

      relationships: {
        marginBottom: '20px',
      },

      attributes: {
        marginBottom: '20px',
      },

      editor: {
        marginTop: 40,
      },

      cover: {
        width: '100%',
        height: 'auto',
      },

      coverDropzone: {
        width: undefined,
        margin: '0 32px',
      },
    };

    if ( ! cover || ! cover.url ) {
      styles.coverDropzone = {
        ...styles.coverDropzone,

        padding: 10,
        border: '1px dashed #666',
        borderRadius: 5,
      };
    }

    return (
      <FlexLayout direction="column" margin={16}>
        <UploadDropzone onUpload={ref => setCover( _id, ref )} style={styles.coverDropzone}>
          { cover ?
            <img src={cover.url} style={styles.cover} /> :
            <span>Drag and drop a file to upload a cover image.</span>
          }
        </UploadDropzone>

        <FlexLayout direction="row" margin={16}>
          <div flex="33">
            <Avatar
              name={name}
              avatar={avatar}
              aliases={aliases.join(', ')}
              onNameChange={name => setName( _id, name )}
              onAliasChange={alias => setAliases( _id, alias )}
              onAvatarChange={ref => setAvatar( _id, ref )}
              style={styles.avatar}
            />

            <Attributes
              id={_id}
              style={styles.attributes}
              count={attributes.length}
              attributes={attributes}
              onChange={(...args) => changeAttribute( _id, ...args )}
              addAttribute={addAttribute}
            />
          </div>

          <div flex="66">
            <Dna
              id={_id}
              style={styles.dna}
              genes={genes}
              changeGene={changeGene}
              addGene={addGene}
              randomGene={randomGene}
              getRandomGene={getRandomGene}
            />

            <div style={styles.editor}>
              <h1>Character Notes</h1>

              <Editor
                onChange={e => setOutline( _id, e )}
                value={content}
              />
            </div>
          </div>
        </FlexLayout>
      </FlexLayout>
    );

            // <Relationships
            //   id={_id}
            //   style={styles.relationships}
            //   relationships={relationships}
            //   world_id={world_id}
            // />
  });
};

