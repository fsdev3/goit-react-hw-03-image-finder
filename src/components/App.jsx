import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Searchbar } from './Searchbar/Searchbar';

// Коли на бекенді закінчилися фото, приховуємо кнопку “Load more”.
//  Для перевірки можна використовувати слова для пошуку “min” “max”.
//  Один із варіантів реалізації приховування кнопки “Load more”
// this.steState(prev =>({
//  images: [...prev.images, ...hits],
//  loadMore: this.state.page < Math.ceil(totalHits / 12 )
// }))
// Не забуваємо коректно опрацьовувати слухача для клавіатури в компоненті модального вікна.

export class App extends Component {
  state = {};

  // Для запиту використовуємо метод життєвого циуклу класового компонента componentDidUpdate.
  // Робити запит на бекенд потрібно в Арр, достатньо однієї умови для запиту:
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      fetch(
        'https://pixabay.com/api/?q=cat&page=1&key=37263495-0dc17f57687021d8824007ffe&image_type=photo&orientation=horizontal&per_page=12'
      );
    }
  }
  // Функція для запиту повинна бути в окремому файлі, в Арр її лише викликаємо.
  render() {
    return (
      <div>
        <Searchbar />
        <ImageGallery />

        {/* <Loader />
      <Button />
      <Modal /> */}
      </div>
    );
  }
}

// fetch
//
