import { FC, useMemo } from 'react'

import { clsx } from 'clsx'

import { ChevronLeft } from '@/assets/icons/chevron-left.tsx'
import { ChevronRight } from '@/assets/icons/chevron-right.tsx'
import { Button } from '@/components/ui'
import s from '@/components/ui/pagination/pagination.module.scss'

export type PaginationProps = {
  totalCount: number // сколько всего объектов, represents the total count of data available from the source.
  currentPage: number //текущая страница, represents the current active page. We'll use a 1-based index instead of a traditional 0-based index for our currentPage value.
  pageSize: number //сколько объектов видно на странице,represents the maximum data that is visible in a single page.
  onPageChange: (page: number) => void //callback function invoked with the updated page value when the page is changed.
  siblingCount?: number //сколько будет страниц спрва и слева до ..., по умолчанию 1  represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.
  className?: string //
}

const classNames = {
  container: clsx(s.container),
  numbers: clsx(s.numbers),
  item: clsx(s.item),
  chevron: clsx(s.chevron),
  currentButton(selected?: boolean) {
    return clsx(this.item, selected && s.selected)
  },
  //classNames.currentButton(isSelected); например
  // Если isSelected === true, то buttonClasses будет содержать оба класса
  // Если isSelected === false, то buttonClasses будет содержать только this.item
}

export const Pagination: FC<PaginationProps> = ({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  siblingCount = 1,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  // paginationRange представляет массив номеров страниц, которые будут отображены в компоненте пагинации
  // Если количество элементов (номеров страниц) в этом массиве меньше 2, это означает, что нет достаточного количества страниц для отображения пагинации
  // Например, если всего есть только одна страница или совсем нет страниц, то в таком случае пагинация не имеет смысла
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }
  let firstPage = currentPage === 1
  let lastPage = paginationRange[paginationRange.length - 1] //Нужны для стилизации кнопок

  return (
    <div className={classNames.container}>
      {/* Кнопка налево, если на первой странице то задизэйблена*/}
      <Button className={classNames.item} onClick={onPrevious} disabled={firstPage}>
        <ChevronLeft />
      </Button>
      {paginationRange.map((pageNumber, index) => {
        let selected = pageNumber === currentPage

        // если элемент массива точки выведи 3 точки форматом юникода
        if (pageNumber === '...') {
          return (
            <Button key={index} className={classNames.item}>
              &#8230;
            </Button>
          )
        }

        // основные кнопки
        return (
          <Button
            key={index}
            disabled={selected || currentPage === lastPage}
            className={classNames.currentButton(selected)}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        )
      })}
      {/*  кнопка направо */}
      <Button className={classNames.item} onClick={onNext} disabled={currentPage === lastPage}>
        <ChevronRight />
      </Button>
    </div>
  )
}

type UsePaginationType = {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
}
type RangeReturnType = (number | '...')[]
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationType) => {
  return useMemo(() => {
    const range = (start: number, end: number) => {
      let length = end - start + 1

      // Возвращяем массив длины (от начала до конца), заполняем его значениями от start до end
      return Array.from({ length }, (_, idx) => idx + start)
    }
    const totalPageCount = Math.ceil(totalCount / pageSize) //округляем до большего результат деления от сколько всего у нас элементов на то, сколько должно быть элементов на страничке
    const totalPageNumbers = siblingCount + 5 // Количество страниц, которые будут отображены (с учетом siblingCount и дополнительных элементов, это первая страница, ..., текущая стрница, ..., последнаяя страница)

    // Если totalPageNumbers меньше, чем количество номеров страниц, которые мы хотим показать,
    // то возвращаем диапазон [1...totalPageCount]. В таком случае, нет необходимости вводить многоточия или какие-либо другие дополнительные элементы пагинации для скрытия.
    //Просто возвращаем диапазон страниц от 1 до общего количества страниц.
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    //Вычисление индексов соседних страниц, убедитесь, что они находятся в диапазоне от 1 до totalPageCount
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    // Мы не показываем многоточия, когда есть только один номер страницы,
    //который будет вставлен между крайними страницами и лимитами страниц (1 и totalPageCount).
    //Поэтому мы используем условие leftSiblingIndex > 2 и rightSiblingIndex < totalPageCount - 2

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    // не показываем ... если мы в начале списка, показываем 5 элементов слева без ...
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, '...', totalPageCount]
    }

    /// не показываем ... если мы в конце списка, показываем 5 элементов справа без ...
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, '...', ...rightRange]
    }

    // случай если мы в середине списка, показываем точки и слева и справа
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage]) as RangeReturnType
}
