﻿using System;
using OpenWaves.ImageTransformations;
using RestImageResize.Contracts;

namespace RestImageResize
{
    /// <summary>
    /// The default implementation if <see cref="IImageTransformationBuilder"/> component.
    /// </summary>
    public class ImageTransformationBuilder : IImageTransformationBuilder
    {
        private const string ValueSholdBePositiveOrZero = "Value should be positive or 0.";

        private int _height;
        private int _width;
        private ImageTransform _transformType;

        /// <summary>
        /// Gets or sets the desired image width.
        /// </summary>
        /// <exception cref="System.ArgumentOutOfRangeException">value</exception>
        public int Width
        {
            get { return _width; }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentOutOfRangeException("value", ValueSholdBePositiveOrZero);
                }

                if (value != _width)
                {
                    _width = value;
                    ImageTransformation = null;
                }

            }
        }

        /// <summary>
        /// Gets or sets the desired image height.
        /// </summary>
        /// <exception cref="System.ArgumentOutOfRangeException">value</exception>
        public int Height
        {
            get { return _height; }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentOutOfRangeException("value", ValueSholdBePositiveOrZero);
                }

                if (value != _height)
                {
                    _height = value;
                    ImageTransformation = null;
                }
            }
        }

        /// <summary>
        /// Gets or sets the type of the transformation that should be applied in image.
        /// </summary>
        public ImageTransform TransformType
        {
            get { return _transformType; }
            set
            {
                if (value != _transformType)
                {
                    _transformType = value;
                    ImageTransformation = null;
                }
            }
        }

        /// <summary>
        /// Gets the image transformation.
        /// </summary>
        /// <value>
        /// The image transformation.
        /// </value>
        protected IImageTransformation ImageTransformation { get; private set; }

        /// <summary>
        /// Applies transformation to an image.
        /// </summary>
        /// <param name="image">The image.</param>
        public void ApplyToImage(IImage image)
        {
            PrepareSize(image);
            ImageTransformation = CreateTransformation();
            ImageTransformation.ApplyToImage(image);
        }

        /// <summary>
        /// Serializes applied transformation instance.
        /// </summary>
        /// <returns>
        /// The serialization string.
        /// </returns>
        public string Serialize()
        {
            if (ImageTransformation != null)
            {
                return ImageTransformation.Serialize();
            }

            return string.Empty;
        }

        /// <summary>
        /// Prepares the transformation size before transformation performing.
        /// </summary>
        /// <param name="image">The target image.</param>
        protected virtual void PrepareSize(IImage image)
        {
            bool ignoreMissedDimension = (TransformType == ImageTransform.Fit || TransformType == ImageTransform.DownFit);

            if (Width == 0)
            {
                Width = ignoreMissedDimension ? int.MaxValue : image.Width;
            }

            if (Height == 0)
            {
                Height = ignoreMissedDimension ? int.MaxValue : image.Height;
            }
        }

        /// <summary>
        /// Creates the image transformation to be applied.
        /// </summary>
        /// <returns>
        /// The transformation instance.
        /// </returns>
        /// <exception cref="System.NotSupportedException">Not supported image transformation type.</exception>
        protected virtual IImageTransformation CreateTransformation()
        {
            int width = Width;
            int height = Height;
            switch (TransformType)
            {
                case ImageTransform.Fit:
                    return new ScaleToFitTransformation(width, height);
                case ImageTransform.Fill:
                    return new ScaleToFillTransformation(width, height);
                case ImageTransform.DownFit:
                    return new ScaleDownToFitTransformation(width, height);
                case ImageTransform.DownFill:
                    return new ScaleDownToFillTransformation(width, height);
                case ImageTransform.Crop:
                    return new CentralCropTransformation(width, height);
                case ImageTransform.Stretch:
                    return new StretchTransformation(width, height);
                default:
                    throw new NotSupportedException("Not supported image transformation type.");
            }
        }
    }
}